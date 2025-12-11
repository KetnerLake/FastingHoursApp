<script>
  let dialog = $state();

  function onCloseClick() {
    close();
  }

  function onVisitClick() {
    window.open( 'https://kevinhoyt.com', '_blank' );
  }

  export function close() {
    dialog.close();
  }

  export function showModal() {
    dialog.showModal();
  }  
</script>

<dialog bind:this={dialog}>

  <section>

    <h3>About</h3>    

    <p>Made with ❤️ by Kevin Hoyt.</p>

    <footer>
      <button class="close" onclick={onCloseClick} type="button">
        Close
      </button>
      <button onclick={onVisitClick} type="button">
        Visit
      </button>
    </footer>
    
  </section>

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

  dialog {
    background: #f8f8f8;    
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

  section {
    display: flex;
    flex-direction: column;
  }

  footer {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
  }

  h3 {
    color: #161616;
    cursor: default;
    flex-basis: 0;
    flex-grow: 1;
    font-family: 'Roboto Variable';
    font-size: 20px;
    font-weight: 400;
    letter-spacing: 0.10px;
    line-height: 28px;
    margin: 0;
    padding: 16px 0 12px 16px;
    text-align: left;
  }    
  
  button {
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

  button.close {
    background: none;
    border: solid 1px #00000040;
    color: #161616;
    font-weight: 400;
    margin-left: auto;
  }  

  p {
    background: #ffffff;
    color: #161616;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    letter-spacing: 0.10px;
    line-height: 20px;
    margin: 0 16px 0 16px;
    padding: 16px;
  }
</style>
