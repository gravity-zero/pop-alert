# pop-alert

# Exemple 
```javascript
<script>  
  const Pop = new PopUp();

  //Your condition(s)


  Pop.params({
          title: "This is my PopUp Title!",
          text: "My cool PopUp Text",
          confirmButton: true,  /*Default*/
          denyButton: true, /*Optionnal*/
          questButton: false, /*Optionnal*/
          image_weigth: 50,
          image_heigth: 40,
          image_src: "http://yourimage.com",
          image_alt: "A lion walking the street",

        })


</script>
```