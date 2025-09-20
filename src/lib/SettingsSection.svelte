<script>
  import Icon from "@iconify/svelte";
  import plate from '$lib/img/plate.jpg';  

  let {ondone, onexport, onimport, onlogout} = $props();

  let input = $state();

  function onDoneClick() {
    if( ondone ) ondone();
  }

  function onExportClick() {
    if( onexport ) onexport();
  }

  function onFileChange( evt ) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener( 'load', ( evt ) => {
      const data = JSON.parse( evt.target.result );
      if( onimport ) onimport( data );
    } );
    reader.readAsText( file );
  }

  function onImportClick() {
    input.click();
  }

  function onLogoutClick() {
    if( onlogout ) onlogout();
  } 
</script>

<section>

  <figure>
    <button onclick={onDoneClick} type="button">
      <Icon height="24" icon="material-symbols:cancel-rounded" width="24" />
    </button>   
    <div>
      <h3>Thank you!</h3>
      <p>Your support means everything to a solo developer like me. All the best in your fasting journey.</p>
    </div> 
  </figure>

  <article>
    <input accept=".json" bind:this={input} onchange={onFileChange} type="file">
    <button class="cancel" onclick={onExportClick} type="button">Export data</button>    
    <button class="cancel" onclick={onImportClick} type="button">Import data</button>    
    <button onclick={onLogoutClick} type="button">Logout</button>
  </article>

</section>

<style>
  article {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    margin: 0;
  }

  article button {
    appearance: none;
    background: #0284c7;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 40px;
    letter-spacing: 0.10px;
    line-height: 20px;
    margin: 0;
    outline: none;
    padding: 0 16px 0 16px;
    transition:
      background 0.30s ease-in-out,
      border 0.30s ease-in-out,
      color 0.30s ease-in-out;
    -webkit-tap-highlight-color: transparent;        
  }    

  article button.cancel {
    background: none;
    border: solid 1px #00000040;
    color: #161616;
    font-weight: 400;
  }  

  article input {
    display: none;
  }

  figure {
    background-image: url( {plate} );
    background: 
      linear-gradient( 
        rgba( 0, 0, 0, 0.10 ), 
        rgba( 0, 0, 0, 0.50 ) 
      ), 
      url( '/plate.png' );    
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 330px;    
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
  }

  figure button {
    align-items: center;
    appearance: none;
    background: none;
    border: none;
    border-radius: 4px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    height: 40px;
    justify-content: center;
    margin: 12px 12px 0 auto;
    outline: none;
    padding: 0;
    width: 40px;
    -webkit-tap-highlight-color: transparent;
  }  

  figure div {
    margin: auto 0 16px 0;
  }

  figure h3 {
    color: #ffffff;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 4px 24px;
    padding: 0;
    text-shadow: 0 0 4px rgba( 0, 0, 0, 0.60 );
  }  

  figure p {
    color: #ffffff;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.10px;
    line-height: 24px;
    margin: 0;
    padding: 0 24px 0 24px;
    text-shadow: 0 0 4px rgba( 0, 0, 0, 0.60 );
  }

  section {
    display: flex;
    flex-direction: column;
  }  
</style>
