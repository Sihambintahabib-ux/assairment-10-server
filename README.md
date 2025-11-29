## INSTRUCTION OF VITE FOR REACT

### 1st process :

- Download vite for react: `npm create vite@latest my-react-project -- --template react`
- Type for conformation : `y`
- `cd my-project`
- `npm install`
- ` npm run dev`
- Local: http://localhost:5173/
- Press ctrl+c to stop the live server
- press `y then enter` to conform

### 2nd process :

- type : `npm create vite@latest`
- choose filename : `my-project`
- choose language : `javascript `
- npm install :
- `cd my-project`
- `npm install`
- ` npm run dev`

## INSTRUCTION OF Install Tailwind

- Install Tailwind CSS : `npm install tailwindcss @tailwindcss/vite`
- Configure the Vite plugin into `vite.config.js file` :  
  `import tailwindcss from '@tailwindcss/vite'`
- add this pluging to vite.config.js into pluging : `tailwindcss()`
- file import in index.css : `@import "tailwindcss";`
- Visit the website for more information :
  `https://tailwindcss.com/docs/installation/using-vite`

## INSTRUCTION OF Install daisy

- download :

```
npm i -D daisyui@latest
```

- file import in index.css : ` @plugin "daisyui";`
- turn off dark mode -

```
 @plugin "daisyui"{
themes: light-default;
};
```

website link : https://daisyui.com/docs/themes/?lang=en

## INSTRUCTION OF Install Toastify

- download : `npm i react-toastify@11.0.0-0`
- import into app.jsx : `import { ToastContainer, toast } from 'react-toastify';`
- import into app.jsx : `import { ToastContainer, toast } from 'react-toastify';`
- Place the `<ToastContainer />` component at the root level of your application (e.g., inside your App.JSX component's return statement) where you want the toasts to appear.
- ADD THE ALERT : `toast ('YOUR COMMENT')` ALSO IMPORT THE toast from the react `import { toast) from "react-toastify";`

- Visit the website for more information :
  `https://www.npmjs.com/package/react-toastify/v/11.0.0-0`

## INSTRUCTION OF Install React-router

- Downoad :

```
npm i react-router
```

- Create ROUTER and RENDER : add these code into `main.jsx`

```
import React from "react";
import ReactDOM from "react-dom/client";

<!-- ?
 import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
? -->


<!-- ?
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
]);
? -->

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
```

- ![alt text](image.png)

## INSTRUCTION OF DEPLOY WEBSITE ON SURGE - DOWNLOAD SURGE (DONT USE POWERSHALL 💣✂)

### 1st way : ❌

```
npm install --global surge
cd dist
surge
```

## 2nd way :

### Normal : ❌

---

- Run in the terminal :

```
npm install --global surge
npm run build
surge dist
```

### React : ❌

---

- Run in the terminal :

```
npm install --global surge
```

- public : Create `_redirects` file in `public` folder and transfer to `dist` folder

```
npm run build
```

- copy `index.html` code and paste to `200.html` in `dist` folder then :

```
surge dist

```

### Custom Domain name : ✅

---

- First install surge, if you haven’t already :

```
 `npm install --global surge
```

- Run in the terminal :

```
npm run build
```

- Deploy to surge by typing

```
surge dist
```

- You can also deploy to a custom domain by adding surge dist yourdomain.com.<BR>
  **custom domain create process** :
  - create a folder in public folder and name it : `CNAME` , put the url : `sihambintahabib-assairment.surge.sh`

### React_route + Firebase : ✅

---

- for **\_react_route + firebase**
- add a `_redirects` file in public folder , write this in the file : `/* /index.html 200`
- Run `npm run build` to add the `_redirects` file in `dist` folder
- copy `index.html` code and paste to `200.html` in `dist` folder

---

Visit the website for more information :
`https://vite.dev/guide/static-deploy.html#surge:~:text=firebase%20deploy.-,Surge,to%20a%20custom%20domain%20by%20adding%20surge%20dist%20yourdomain.com.,-Azure%20Static%20Web`

---

## INSTRUCTION OF DEPLOY WEBSITE ON netlify / cloudflare

ড্র্যাগ এন্ড ড্রপ করে netlify / cloudflare এ রিলিজ দিলে react রাউটার সরাসরি কাজ করবে না। সেটা করার জন্য তোমার dist ফোল্ডার ড্র্যাগ করে ড্রপ করার আগে একটা ফাইল তৈরি করে নিতে হবে। সেই ফাইল এর নাম হবে: `_redirects` আর তারমধ্যে জাস্ট এক লাইন থাকবে। সেখানে লেখা থাকবে:

```
/* /index.html 200
```

---

## firebase

1. run : ` npm install firebase`
2. create a new file (Firebase-config.js) and paste it :

```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDI0Wge3VTum0d_VgViA5NI4cHU7eGJK68",
  authDomain: "assairment--9.firebaseapp.com",
  projectId: "assairment--9",
  storageBucket: "assairment--9.firebasestorage.app",
  messagingSenderId: "168057864503",
  appId: "1:168057864503:web:3c48f4aa34a18c2b7cdab2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);



```

---

## React code clone from react

- clone from github : `git clone url`
- run `npm i`

## INSTRUCTION OF Install React-icons

downloads : `npm i react-icons`

## INSTRUCTION OF Install axios

downloads : `  npm i axios`

---

## INSTRUCTION OF Install CustomTheam

Install Yeoman and the VS Code Extension Generator:

```
npm install -g yo generator-code
```

Generate a New Theme Project.

```
yo code
```

Youtube Video : https://www.youtube.com/watch?v=i8zZ6rwItZ4&list=LL&index=10 <br>
Private Github link : https://github.com/Sihambintahabib-ux/vsCode-theme-change.git <br>
Website : https://themes.vscode.one/

---

## Github setup :

- Origin remote (remote repositories associated with the project) :

```
git remote -v
```

- change the remote URL

```
git remote set-url origin `URL : https://github.com/ferdouszihad/dragon-news-firebase.git`
```

- force push

```
git....push --force
```

---

## live link :

ASSAIREMENT : 9
git repo link : https://github.com/Sihambintahabib-ux/assairment-9.git
<br>
live link : https://sihambintahabib-assairment-9.surge.sh/services

---

ASSAIREMENT : 10
code : Code For Counting Ass-10 on 60 Marks : (marks60)-ass10#inc-ExM25

client :
git repo link : https://github.com/Sihambintahabib-ux/assairment-10-client.git
<br>
live link : https://sihambintahabib-assairment10.surge.sh/
<br>
server :
git repo link : https://github.com/Sihambintahabib-ux/assairment-10-server.git
<br>
live link : https://assairment10.vercel.app/

## https://vercel.com/sihams-projects-0a3f7554/assairment10
