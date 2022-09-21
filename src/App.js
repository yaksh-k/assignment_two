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
  const s3URi = 's3://compx527assignment2bucket192340-dev/public/';

  var imageURI = "";

  const uploadFile = async () => {
    const result = await Storage.put(user.username + fileData.name, fileData, {
      contentType: fileData.type,
    });
    setFileStatus(true);
    console.log(21, result);
  };

  fileStatus ? imageURI = s3URi + user.username + fileData.name  : imageURI = "Undefined"

  return (
    <div className="App">
      <div>
        <h1>Cat and Dog Classifier</h1>
        <h2>COMPX527 A2</h2>
      </div>

      <div>
        <label for = "file-uploadFile" class="custom-file-upload">Custom Upload</label>
        <input id = "uploadFile" type="file" accept="image/png, image/jpeg" onChange={(e) => setFileData(e.target.files[0])} />
      </div>

      <div>
        <button onClick={uploadFile}>Upload File</button>
      </div>
      
      <div>
        {fileStatus ? "Image uploaded successfully." : "Please upload an image."}
        <br />

        {"Image URI: " + imageURI}
      </div>

      <div>
        <button onClick={signOut}>Sign out</button>
      </div>
    </div>
  );
}

export default withAuthenticator(App);