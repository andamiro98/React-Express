export const Test = (name) =>{
   return(
   <div>
      <h1>Hello, {name.name}!</h1>
   </div>
   );
};


Test.defaultProps = {
   name: "default"
};
