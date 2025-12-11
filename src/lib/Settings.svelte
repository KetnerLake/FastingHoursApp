<script>
  import { Database } from "./Database.svelte";
  import LoginSection from "./LoginSection.svelte";
  import SettingsSection from "./SettingsSection.svelte";
  import SignUpSection from "./SignUpSection.svelte";
  import TokenSection from "./TokenSection.svelte";

  let {authenticated = false} = $props();
  
  const db = new Database();
  /*
  const auth = db.ui().subscribe( ( evt ) => {
    if( evt && evt.type && evt.type === 'otp' ) {
      submit = evt.onSubmit;
    }
  } );
  */

  let submit = null;  

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

    db.check( email )
    .then( ( response ) => response.json() )
    .then( ( data ) => {
      if( data === null ) {
        login_disabled = false;
        alert( 'User not found.' );
      } else {
        db.verify( email );
        screen = 'token';
        login_disabled = false;
      }
    } );
  }

  function onSettingsDone() {
    close();    
  }  

  async function onSettingsExport() {
    const data = {
      history: await db.browseHistory(),
      hunger: await db.browseHunger(),
      water: await db.browseWater(),
      weight: await db.browseWeight()
    }

    const json = JSON.stringify( data, null, 2 );
    const blob = new Blob( [json], {type: 'application/json'} );
    const url = URL.createObjectURL( blob );

    const a = document.createElement( 'a' );
    a.href = url;
    a.download = 'fasting-hours.json';
    document.body.appendChild( a );
    a.click();
    
    document.body.removeChild( a );
    URL.revokeObjectURL( url );
  }

  async function onSettingsImport( data ) {
    console.log( 'IMPORT' );
    console.log( data );
    
    if( data.history.length > 0 ) await db.bulkHistory( data.history );
    if( data.hunger.length > 0 ) await db.bulkHunger( data.hunger );    
    if( data.water.length > 0 ) await db.bulkWater( data.water );    
    if( data.weight.length > 0 ) await db.bulkWeight( data.weight );    
    
    await db.sync();
      
    dialog.close();
  }

  function onSettingsLogout() {
    db.logout().then( () => {
      authenticated = false;
      screen = 'signup';
      dialog.close();
    } );
  }

  function onSignUpDone() {
    close();
  }

  function onSignUpLogin() {
    screen = 'login';
  }

  function onSignUpSend( form ) {
    signup_disabled = true;

    fetch( 'https://ketnerlake.com/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        source: 'Fasting Hours', 
        email: form.email, 
        category: 'Sign Up', 
        subject: 'Sync Interest',
        message: form.message
      } )
    } )
    .then( ( response ) => response.text() )
    .then( ( id ) => {
      console.log( id );
      signup_email = null;
      signup_message = null;
      dialog.close();
      signup_disabled = false;      
      alert( 'Thanks for your message!' );
    } );
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
    submit( {otp} );
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

  {#if authenticated}
    <SettingsSection
      ondone={onSettingsDone}
      onexport={onSettingsExport}
      onimport={onSettingsImport}
      onlogout={onSettingsLogout} />
  {:else}
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
