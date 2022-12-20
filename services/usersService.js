const usersDal = require("../dal/usersDal");
const { OAuth2Client } = require("google-auth-library");

const LoginWithGoogle = async (userDetails) => {
  const client = new OAuth2Client(userDetails.sub);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken:
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhjMjdkYjRkMTNmNTRlNjU3ZDI2NWI0NTExMDA4MGI0ODhlYjQzOGEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzE1NDI4NTEsImF1ZCI6Ijg5MzYxNjA5Ni0zbHEyMWJ0aTRibWd0NnE2aG9uOWoyOTIwZXN2aGl2dS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExNTgzNTMzMTE1MjgxMTM5OTQ3MyIsImVtYWlsIjoieW9uaXZpZEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODkzNjE2MDk2LTNscTIxYnRpNGJtZ3Q2cTZob245ajI5MjBlc3ZoaXZ1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IteZ15TXldeg16rXnyDXldeZ15PXnCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA2ZTg0R3E5ZWhNYm4yeW83ZVJVN1B6bm51N1MtVTBIdWpmckRqMj1zOTYtYyIsImdpdmVuX25hbWUiOiLXmdeU15XXoNeq158iLCJmYW1pbHlfbmFtZSI6IteV15nXk9ecIiwiaWF0IjoxNjcxNTQzMTUxLCJleHAiOjE2NzE1NDY3NTEsImp0aSI6IjFlNjgzNTBiNmI4ZDZhZWI0MGFmMmFhMDIxODlkMDI5NDJkYjhlZDQifQ.UpkMLzrBNc0_ZlJGISQ1BMGbB3F--Xl-Su1YVSgziSNAOeU7TgUQwJBncnBoZdZnTGWV8WkMVS1hQ3ndVYEXGngCge9u8u1Bdc-RV_kSrI7RM7Kho4TyGiaC7YL46_kmSEI6Yy_-g7LBcClZENsIfTgTl_iuCnZNpTHyqP03RJFkIuxuXO-Nb5HLS0d6JgB1gtDdow9XNx0NtIFLmo-AqSOtn1TMllxS4F844TGW-0IuF-cUMTVn7BMO1wTFi95f17JOijnxnGuo_U5k6eY8tWYodEKElalqRdsIjkEaZf9uyDelualPSERqNyMX5GF99TNx2Z3iLo1_593DwUSSLA",
      audience:
        "893616096-3lq21bti4bmgt6q6hon9j2920esvhivu.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    console.log({payload});
    // If request specified a G Suite domain:
    // const domain = payload['hd'];
  }
  verify().catch(console.error);
  try {
    const res = await usersDal.LoginWithGoogle(userDetails);
    return client;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  LoginWithGoogle,
};
