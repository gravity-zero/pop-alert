# pop-alert
Just in case you need custom javascript alert
it's like sweet-alert : https://sweetalert2.github.io/

If you want try it, here the CDN : https://cdn.pop-up.gravity-zero.fr/js/pop-up.js
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
    width: 500, // pop-up width
    height: 300, // pop-up height
    img_link: "http://yourimage.com",
    img_weight: 157,
    img_height: 69,
    img_alt: 'My logo',
    timer: 5000 // timer before close pop-up
  })
  .then((result) => {
    if(result.confirmation){
      //Do some stuff
    }else if(result.denied){
      //Do some stuff
    }
  });

</script>
```
