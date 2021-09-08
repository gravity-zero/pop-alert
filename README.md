# pop-alert
Just in case you need custom javascript alert
it's like sweet-alert : https://sweetalert2.github.io/
# Exemple 
```javascript
<script>  
  const Pop = new PopUp();

  //Your condition(s)

  Pop.params({
    icon: 'validation',
    title: "This is my PopUp Title!",
    text: "My cool PopUp Text", // or html: <p>My cool PopUp Text</p>
    showConfirmButton: true,
    showDenyButton: true,
    img_link: "http://yourimage.com",
    img_weight: 157,
    img_height: 69,
    img_alt: 'My logo',
  })
  .then((result) => {
    if(result.confirm){
      //Do some stuff
    }else if(result.denied){
      //Do some stuff
    }
  });

</script>
```