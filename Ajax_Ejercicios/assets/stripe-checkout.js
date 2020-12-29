/* ********** Curso JavaScript: 129. Ejercicios AJAX - APIs: Pagos Online con Fetch y Stripe (1/4) - #jonmircha ********** */
import STRIPE_KEYS from "./stripe-keys.js";

//console.log(STRIPE_KEYS);

const d = document,
  $tacos = d.getElementById("tacos"),
  $template = d.getElementById("taco-template").content,
  $fragment = d.createDocumentFragment(),
  fetchOptions = {
    headers: {
      Authorization: `Bearer ${STRIPE_KEYS.secret}`,
    },
  };

let products, prices;

Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
]).then(responses => Promise.all(responses.map((res) => res.json())))
.then(json => {
  //console.log(json);
  products = json[0].data;
  prices = json[1].data;
  //console.log(products, prices);

  prices.forEach(el => {
    let productData = products.filter((product) => product.id === el.product);
    //console.log(productData);

    $template.querySelector(".taco").setAttribute("data-price",el.id);
    $template.querySelector("img").src = productData[0].images[0];
    $template.querySelector("img").alt = productData[0].name;
    $template.querySelector("figcaption").innerHTML = `
    ${productData[0].name}
    <br>
    ${el.unit_amount_decimal} ${el.currency}
    `;



    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $tacos.appendChild($fragment);

})
.catch(err => {
  console.log(err);
  let message = err.statusText || "Ocurrio un error en la API";
  $tacos.innerHTML = `<p>Error ${err.status}: ${message}</p>`
})

/* Invocar 2 llamadas fetch no es obtimo por eso usamos promesas old
que nos permite llamar a 2 y cuando esten listas mostrar una sola */

/* ********** Curso JavaScript: 130. Ejercicios AJAX - APIs: Pagos Online con Fetch y Stripe (2/4) - #jonmircha ********** */
/* ********** Curso JavaScript: 131. Ejercicios AJAX - APIs: Pagos Online con Fetch y Stripe (3/4) - #jonmircha ********** */
/* ********** Curso JavaScript: 132. Ejercicios AJAX - APIs: Pagos Online con Fetch y Stripe (4/4) - #jonmircha ********** */
