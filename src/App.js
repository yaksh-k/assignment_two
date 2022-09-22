import Amplify from "aws-amplify";
import "./App.css";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import { Storage } from "aws-amplify";

import awsExports from "./aws-exports";
import { useState } from "react";
Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus] = useState(false);
  var imageURI = "";
  const s3URi = 's3://compx527assignment2bucket192340-dev/public/';

  // var imageURI = "";
  var animal = "";
  var breed = "";

  const uploadFile = async () => {
    const result = await Storage.put(user.username + fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);

    imageURI = s3URi + user.username + fileData.name;

    fetchTags();
  };

  async function fetchTags() {
    // Call the API.
    const res = await fetch('https://ykyk4cx158.execute-api.us-east-1.amazonaws.com/527-deploy-staging/models?uri=' + imageURI)

    // Convert the result into JSON.    
    const jsonRes = await res.json();

    // Turn the result into a string.
    var str = JSON.stringify(jsonRes);

    // Remove unused information.
    str = str.replace('{"Tags":["', '');
    str = str.replace('","', ',');
    str = str.replace('"]}', '');

    // Store the animal and breed.
    var resWords = str.split(',');
    animal = resWords[0];
    breed = resWords[1];

    console.log(animal);
    console.log(breed);
  }

  return (
    <div className="App">
      <div>
        <h1>Cat and Dog Classifier</h1>
        <h2>COMPX527 A2</h2>
      </div>

      <div>
        <label className="custom-file-upload">
          <input id = "uploadFile" type="file" accept="image/png, image/jpeg" onChange={(e) => setFileData(e.target.files[0])} />
          Select Image
        </label>
      </div>

      <div>
        <button onClick={uploadFile}>Upload File</button>
      </div>
      
      <div>
        <p>{fileStatus ? "Image uploaded successfully." : "Please upload an image."}</p>
        <br />

        <p>{fileStatus ? animal : "Please upload an image."}</p>
        <p>Breed: </p>
      </div>

      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}

export default withAuthenticator(App);