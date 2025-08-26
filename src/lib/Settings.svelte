<script>
  import LoginSection from "./LoginSection.svelte";
  import SignUpSection from "./SignUpSection.svelte";
  import TokenSection from "./TokenSection.svelte";

  let {authenticated = false} = $props();

  let dialog = $state();
  let login_disabled = $state( false );
  let login_email = $state( '' );
  let screen = $state( 'signup' );
  let signup_disabled = $state( false );
  let signup_email = $state( '' );
  let signup_message = $state( '' );  
  let token_disabled = $state( false );
  let token_value = $state( '' );

  function onLoginCancel() {
    screen = 'signup';
    login_disabled = false;
  }

  function onLoginDone() {
    close();    
  }

  function onLoginVerify( email ) {
    login_email = email;
    login_disabled = true;
  }

  function onSignUpDone() {
    close();
  }

  function onSignUpLogin() {
    screen = 'login';
  }

  function onSignUpSend( form ) {
    signup_disabled = true;
  }

  function onTokenCancel() {
    screen = 'signup';
    token_disabled = false;
  }  

  function onTokenDone() {
    close(); 
  }  

  function onTokenLogin( otp ) {
    token_value = otp;
    token_disabled = true;
  }

  export function close() {
    dialog.close();

    screen = 'signup';

    signup_disabled = false;         
    signup_email = null;
    signup_message = null;
    
    login_disabled = false;
    login_email = null;

    token_disabled = false;
    token_value = null;
  }

  export function showModal() {
    dialog.showModal();
  }  
</script>

<dialog bind:this={dialog}>

  {#if screen === 'signup'}
    <SignUpSection 
      disabled={signup_disabled}
      email={signup_email}
      message={signup_message}
      ondone={onSignUpDone} 
      onlogin={onSignUpLogin} 
      onsend={onSignUpSend} />
  {:else if screen === 'login'}
    <LoginSection 
      disabled={login_disabled}
      email={login_email}
      oncancel={onLoginCancel} 
      ondone={onLoginDone}
      onverify={onLoginVerify} />
  {:else if screen === 'token'}      
    <TokenSection
      disabled={token_disabled}
      oncancel={onTokenCancel}
      ondone={onTokenDone}
      onlogin={onTokenLogin}
      value={token_value} />
  {/if}

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
</style>
