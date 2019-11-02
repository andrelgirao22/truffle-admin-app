// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

//api: "https://truffle-system.herokuapp.com/",
export const environment = {
  production: false,
  api: "https://localhost:8080/",
  bucket_img: "https://s3-sa-east-1.amazonaws.com/truffle-app"
};
