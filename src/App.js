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

  function fetchTags() {
    console.log(imageURI)
    fetch('https://ykyk4cx158.execute-api.us-east-1.amazonaws.com/527-deploy-staging/models?uri=' + imageURI)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
      console.log(err)
    });
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

        <p>{"Image URI: " + imageURI}</p>
      </div>

      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}

export default withAuthenticator(App);