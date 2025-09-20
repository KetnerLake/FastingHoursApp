<script>
  import Icon from "@iconify/svelte";
  import plate from '$lib/img/plate.jpg';

  let {disabled = false, email = null, message = null, ondone, onlogin, onsend} = $props();

  let email_error = $state( false );
  let input = $state();
  let message_error = $state( false );
  let textarea = $state();

  function onDoneClick() {
    email = '';
    message = '';

    if( ondone ) ondone();
  }

  function onLoginClick() {
    if( onlogin ) onlogin();
  }

  function onSendClick() {
    if( email.trim().length === 0 ) {
      email_error = true;
      input.focus();
      return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if( !regex.test( email ) ) {
      email_error = true;
      input.focus();
      return;      
    }

    email_error = false;

    if( message.trim().length === 0 ) {
      message_error = true;
      textarea.focus();
      return;
    }    

    message_error = false;

    if( onsend ) onsend( {email, message} );
  }
</script>

<section>

  <figure>
    <button onclick={onDoneClick} type="button">
      <Icon height="24" icon="material-symbols:cancel-rounded" width="24" />
    </button>
    <div>
      <h3>Fasting Hours</h3>
      <p>Want more features?</p>
      <ul>
        <li>Automated backup</li>
        <li>Sync across devices</li>
        <li>Export/import data</li>
      </ul>
      <p>Send me a message with the login email address that you would like to use. The first ten messages get a lifetime account for <span>FREE</span>.</p>      
    </div>
  </figure>

  <form>
    <div>
      <p class:error={email_error}>Email address</p>
      <input bind:this={input} bind:value={email} {disabled} type="text">
    </div>
    <div>
      <p class:error={message_error}>Message</p>
      <textarea bind:this={textarea} bind:value={message} {disabled}></textarea>
    </div>    
  </form>

  <footer>
    <button class="login" {disabled} onclick={onLoginClick} type="button">Login</button>    
    <button {disabled} onclick={onSendClick} type="button">Send</button>    
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
    margin: 0 0 0 24px;
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

  figure p span {
    font-weight: 600;
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

  footer button.login {
    background: none;
    border: solid 1px #00000040;
    color: #161616;
    font-weight: 400;
    margin-right: auto;
  }  

  footer button[disabled] {
    background: #0284c740;
    cursor: not-allowed;
  }  

  footer button[disabled].login {
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
      border 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
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

  form textarea {
    appearance: none;
    border: solid 1px #00000040;
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
    color: #161616;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 80px;
    line-height: 24px;
    margin: 0;
    outline: none;
    padding: 10px 16px 10px 16px;
    resize: none;
    transition: 
      background 0.30s ease-in-out,
      border 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;
    -webkit-tap-highlight-color: transparent;      
  }  

  form textarea:focus {
    border: solid 1px #0284c7;
    box-shadow: 0 0 0 3px rgb( from #0284c7 r g b / 0.40 );    
  }  

  form textarea[disabled] {
    background: #00000010;
    color: #00000040;
    cursor: not-allowed;
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

  .error {
    color: #dc2626;
    font-weight: 500;
  }
</style>
