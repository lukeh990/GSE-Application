# GSE Application
This program is used as the intro for my 2023 GSE (Governor's School for Entrepreneurs) Application. As such it has been heavily rushed and if I was actually making this for distribution I would have used a lower level language such as rust.
  
If you want to run this program binaries for mac, linux, and windows (x64 only) will be available on the releases tab.
  
If you need arm64 version see building instructions bellow. (Node 18 Required)

Step One: Clone Repo
  
```sh
git clone https://lukeh990/GSE-Application
```

Step Two: Install Dependencies
  
```sh
npm install
```

Step Three: If you are running arm64 change these values in `package.json`
  
```json
"pkg": {
    "targets": [
      "node18-win-arm64",
      "node18-macos-arm64",
      "node18-linux-arm64"
    ],
    "scripts": [
      "out/*.js"
    ],
    "assets": [
      "node_modules/figlet/fonts/Big.flf"
    ],
    "outputPath": "build"
  },
```

Step Four: Run build script
  
```sh
npm run build
```

Step Five: Run package script
  
```sh
npm run package
```

All build files will now be accessible in the `build` folder