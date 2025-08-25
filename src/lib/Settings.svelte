<script>
  import Icon from "@iconify/svelte";

  let dialog = $state();

  function onDoneClick() {
    close();
  }

  export function close() {
    dialog.close();
  }

  export function showModal() {
    dialog.showModal();
  }
</script>

<dialog bind:this={dialog}>

  <figure>
    <button onclick={onDoneClick} type="button">
      <Icon height="24" icon="material-symbols:cancel-rounded" width="24" />
    </button>
    <div>
      <h3>Fasting Hours</h3>
      <p>Want more features?</p>
      <ul>
        <li>Data backup</li>
        <li>Sync across devices</li>
        <li>Export data</li>
      </ul>
      <p>Send me a message with the login email address that you would like to use. The first ten messages get a lifetime account for <span>FREE</span>.</p>      
    </div>
  </figure>

  <article>

  </article>

</dialog>

<style>
  @keyframes open {
    from {
      transform: translateY( 16px );
      opacity: 0;
    }
    to {
      transform: translateY( 0 );
      opacity: 1.0;
    }
  }

  article {
    height: 330px;
  }

  dialog {
    background: #ffffff;
    border: none;
    border-radius: 4px;
    box-shadow: 
      0 0 40px -10px rgba( 0, 0, 0, 0.30 ), 
      0 0 25px -15px rgba( 0, 0, 0, 0.20 );  
    box-sizing: border-box;  
    flex-direction: column;
    outline: none;
    padding: 0;
    width: 330px;
  }

  dialog[open] {
    animation: open 0.30s forwards;
    display: flex;
  }

  figure {
    background-image: url( /plate.png );
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

  h3 {
    color: #ffffff;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 0 24px;
    padding: 0;
    text-shadow: 0 0 4px rgba( 0, 0, 0, 0.60 );
  }  

  p {
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

  p span {
    font-weight: 600;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 16px;
    padding: 4px 0 4px 40px;
  }

  ul li {
    color: #ffffff;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.10px;
    line-height: 24px;
    text-shadow: 0 0 4px rgba( 0, 0, 0, 0.60 );
  }
</style>
