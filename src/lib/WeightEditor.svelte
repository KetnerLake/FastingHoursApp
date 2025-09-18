<script>
  import DateTimePicker from "./DateTimePicker.svelte";  
  import Icon from "@iconify/svelte";
  import WaterSelect from "./WaterSelect.svelte";

  let {item = null, oncancel, ondelete, onsave} = $props();

  let dialog = $state();
  let input = $state();

  let units = $derived( item && item.units && item.units !== null ? item.units : 'lbs' );  
  let weight = $derived( item && item.weight && item.weight !== null ? item.weight : '' );    

  function onCancelClick() {
    close();
    item = null;
    if( oncancel ) oncancel();
  }

  function onDateChange( value ) {
    const created = new Date( value.getTime() );
    item = {... item, created};
  }

  function onDeleteClick() {
    if( ondelete ) ondelete( item.id );
  }

  function onInputChange( evt ) {    
    const weight = evt.currentTarget.value;
    item = {... item, weight};    
  }

  function onSaveClick() {
    console.log( item, 'Item' );
    console.log( weight, 'Weight' );
    const parsed = attemptWeightAsFloat( weight );
    console.log( parsed, 'Parsed' );

    if( parsed === null ) {
      input.focus();
      return;
    } else {
      item = {... item, weight: parsed};
    }

    if( !item.type ) {
      item = {... item, type: 'weight'};
    }

    if( !item.created ) {
      item = {... item, created: new Date()};
    }

    item = {... item, updated: new Date()};

    if( !item.units ) {
      item = {... item, units: 'lbs'};
    }

    if( onsave ) onsave( item );
  }

  function onUnitsClick( value ) {
    const units = value === 'lbs' ? 'kg' : 'lbs';
    item = {... item, units};
  }

  function attemptWeightAsFloat( value ) {
    if( typeof value === "number" ) return value;

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "") {
        return null; // empty string → null
      }

      // Use the user's locale (browser environment)
      const locale = navigator.language || "en-US";

      // Detect separators for this locale
      const example = Intl.NumberFormat(locale).format(12345.6);
      const groupSep = example.match(/12(.*?)345/)[1];
      const decimalSep = example.match(/345(.*?)6/)[1];

      // Escape regex special chars
      const esc = s => s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

      // Normalize: remove grouping, replace decimal with "."
      let normalized = trimmed
        .replace(new RegExp(esc(groupSep), "g"), "")
        .replace(new RegExp(esc(decimalSep)), ".");

      // Strict float pattern (after normalization)
      const floatPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;

      if (floatPattern.test(normalized)) {
        return parseFloat(normalized);
      }
    }

    return null; // invalid → null
  }

  export function close() {
    dialog.close();
    item = null;
  }

  export function showModal() {
    dialog.showModal();
  }
</script>

<dialog bind:this={dialog}>

  <h3>{item === null || !item.id || item.id === null ? 'New' : 'Edit'} Weight</h3>

  <label>
    <Icon height="20" icon="hugeicons:weight-scale" width="20" />
    <input 
      inputmode="decimal" 
      bind:this={input} 
      value={weight} 
      oninput={onInputChange}
      placeholder="Weight" 
      type="text">
    <button onclick={() => onUnitsClick( units )} type="button">{units}</button>
  </label>
  <DateTimePicker 
    label="Measured" 
    onchange={onDateChange} 
    value={item && item.created ? item.created : new Date()} />

  <footer>
    {#if item && item.id && item.id !== null}
      <button class="delete" onclick={onDeleteClick} type="button">Delete</button>            
    {/if}
    <button class="cancel" onclick={onCancelClick} type="button">Cancel</button>    
    <button onclick={onSaveClick} type="button">Save</button>    
  </footer>

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
    width: 330px;
  }

  dialog[open] {
    animation: open 0.30s forwards;
    display: flex;
  }

  footer {
    display: flex;
    flex-direction: row;
    gap: 16px;
    justify-content: flex-end;
    padding: 16px 0 0 0;
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
    -webkit-tap-highlight-color: transparent;        
  }    

  footer button.cancel {
    background: none;
    border: solid 1px #00000040;
    color: #161616;
    font-weight: 400;
  }  

  footer button.delete {
    background: #dc2626;
    margin-right: auto;
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
    padding: 0 0 12px 0;
    text-align: left;
  }  

  label {
    align-items: center;
    background: #ffffff;
    border: solid 1px transparent;
    border-radius: 4px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    gap: 8px;
    margin: 0 0 16px 0;
    outline: none;
    padding: 0 6px 0 12px;
    transition: 
      border 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;        
    -webkit-tap-highlight-color: transparent;            
  }

  label:focus-within {
    border: solid 1px #0284c7;
    box-shadow: 0 0 0 3px rgb( from #0284c7 r g b / 0.40 );    
  }

  label button {
    align-items: center;
    appearance: none;    
    background: none;
    border: none;
    box-sizing: border-box;
    color: #00000040;
    cursor: pointer;
    display: flex; 
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    justify-content: center;
    height: 38px;
    margin: 0;
    min-width: 38px;
    outline: none;
    padding: 0;
    -webkit-tap-highlight-color: transparent;                
  }

  label input {
    appearance: none;
    background: none;
    border: none;
    box-sizing: border-box;
    color: #161616;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 16px;
    font-weight: 400;
    height: 40px;
    outline: none;
    margin: 0;
    min-width: 0;
    padding: 0;
    width: 100%;
    -webkit-tap-highlight-color: transparent;                
  }

  label input::placeholder {
    color: #00000040;
    opacity: 1.0;
  }  
</style>
