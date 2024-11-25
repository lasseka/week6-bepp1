const crypto = require('crypto')

const key = "duubaduu"
const crypt = crypto.createCipher("aes-128-cbc", key)
let password = crypt.update("testpassword", "utf8", "hex")
password += crypt.final("hex")
console.log(password)


//Rest of this file is all copy pasted from the example, figured there was little point in trying to write these from scratch as theyre deprecated/bad practice

function base64UrlEncode(data) {
    return Buffer.from(data)
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }
  
  // Decode from Base64URL
  function base64UrlDecode(encodedData) {
    const base64 = encodedData.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(base64, "base64").toString();
  }
  
  // Test
  console.log("Encoded Data:", base64UrlEncode("hello")); // aGVsbG8
  console.log("Decoded Data:", base64UrlDecode("aGVsbG8")); // hello

  const crypto = require("crypto");

// Hash function
function hash(payload, secret, header) {
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  return crypto
    .createHmac("sha256", secret)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("hex");
}

// Test
// const header1 = { alg: "HS256", typ: "JWT" }; // Customizable
// const payload1 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Custom payload
// const secret1 = "my-secret-key";

// console.log("Hash:", hash(payload1, secret1, header1));

// Simulate jwt.sign()
function jwtSign(payload, secret, header = { alg: "HS256", typ: "JWT" }) {
    // Step 1: Encode header and payload to Base64URL
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  
    // Step 2: Create a signature using the encoded header, payload, and secret
    const signature = hash(payload, secret, header);
  
    // Step 3: Combine all parts into the JWT structure
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }
  
  // Example Usage
  // const payload2 = { userId: 123, exp: Math.floor(Date.now() / 1000) + 60 }; // Expires in 60 seconds
  // const mySecret2 = require("crypto").randomBytes(64).toString("hex"); // Strong secret
  // const header2 = { alg: "HS256", typ: "JWT" }; // Customizable
  
  // console.log("Generated Secret:", mySecret2);
  // const token2 = jwtSign(payload2, mySecret2, header2);
  // console.log("JWT:", token2);

  // Example Usage
const header = { alg: "HS256", typ: "JWT" }; // Customizable
const payload = {
  userId: 123,
  userName: "Matti",
}; 
const secret = require("crypto").randomBytes(64).toString("hex");

console.log("Generated Secret:", secret);
const token = jwtSign(payload, secret, header);
console.log("JWT:", token);

console.log(jwtVerify(token, secret)); // Should print: { valid: true, payload: { userId: 123, userName: "Matti" } }