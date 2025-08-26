<script>
  import Icon from "@iconify/svelte";
  import plate from '$lib/img/plate.jpg';  

  let {disabled = false, oncancel, ondone, onlogin, value = null} = $props();

  let otp_error = $state( false );
  let input = $state();

  function onCancelClick() {
    value = '';
    otp_error = false;

    if( oncancel ) oncancel();
  }

  function onDoneClick() {
    value = '';
    otp_error = false;

    if( ondone ) ondone();
  }

  function onLoginClick() {
    if( value.trim().length === 0 ) {
      otp_error = true;
      input.focus();
      return;
    }

    otp_error = false;

    if( onlogin ) onlogin( value );
  }
</script>

<section>

  <figure>
    <button onclick={onDoneClick} type="button">
      <Icon height="24" icon="material-symbols:cancel-rounded" width="24" />
    </button>   
    <div>
      <h3>Check your email</h3>
      <p>A one-time password has been sent to the email address you provided. You will remain logged in on this device as long as you visit within 30 days (rolling).</p>
    </div> 
  </figure>

  <form>
    <div>
      <p class:error={otp_error}>One-time password</p>
      <input bind:this={input} bind:value {disabled} type="text">
    </div>    
  </form>

  <footer>
    <button class="cancel" {disabled} onclick={onCancelClick} type="button">Cancel</button>    
    <button {disabled} onclick={onLoginClick} type="button">Login</button>    
  </footer>      

</section>

<style>
  section {
    display: flex;
    flex-direction: column;
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

  footer {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: flex-end;
    padding: 0 16px 16px 16px;
  }

  footer button {
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

  footer button.cancel {
    background: none;
    border: solid 1px #00000040;
    color: #161616;
    font-weight: 400;
  }  

  footer button[disabled] {
    background: #0284c740;
    cursor: not-allowed;
  }  

  footer button[disabled].cancel {
    background: none;
    cursor: not-allowed;
    color: #00000040;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0;
    padding: 16px;
  }

  form div {
    display: flex;
    flex-direction: column;
  }

  form input {
    appearance: none;
    border: solid 1px #00000040;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    color: #161616;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    line-height: 40px;
    margin: 0;
    outline: none;
    padding: 0 16px 0 16px;
    transition: 
      background 0.30s ease-in-out,
      box-shadow 0.15s ease-in-out,
      border 0.15s ease-in-out;
    -webkit-tap-highlight-color: transparent;
  }

  form input:focus {
    border: solid 1px #0284c7;
    box-shadow: 0 0 0 3px rgb( from #0284c7 r g b / 0.40 );    
  }

  form input[disabled] {
    background: #00000010;
    color: #00000040;
    cursor: not-allowed;
  }

  form p {
    color: #161616;
    cursor: default;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.10px;
    line-height: 24px;
    margin: 0;
    padding: 0 0 4px 0;    
    transition: color 0.30s ease-in-out;
  }

  .error {
    color: #dc2626;
    font-weight: 500;
  }
</style>
