<script>
  import { onMount } from "svelte";

  let {value = []} = $props(); 

  let graph_height = $state( 0 );
  let graph_width = $state( 0 );  
  let view = $state( 3 );

  let data = $derived.by( () => {
    let results = null;

    switch( view ) {
      case 0: return week;
      case 1: return month;
      case 2: return year;
      default: 
        results = [... value];
        results.sort( ( a, b ) => {
          if( a.created.getTime() > b.created.getTime() ) return 1;
          if( a.created.getTime() < b.created.getTime() ) return -1;      
          return 0;
        } );
        break;
    }

    return results;
  } );

  let maximum_x = $derived.by( () => {
    if( data.length === 0 ) return Date.now();
    const times = data.map( ( v ) => v.created.getTime() );
    return Math.max( ... times );
  } );
  let maximum_y = $derived.by( () => {
    if( data.length === 0 ) return 300;    
    const values = data.map( ( v ) => v.weight );
    return Math.max( ... values );
  } );
  let minimum_x = $derived.by( () => {
    if( data.length === 0 ) return Date.now();    
    const times = data.map( ( v ) => v.created.getTime() );
    return Math.min( ... times );
  } );
  let minimum_y = $derived.by( () => {
    if( data.length === 0 ) return 0;        
    const values = data.map( ( v ) => v.weight );
    return Math.min( ... values );
  } );
  let range_maximum = $derived.by( () => {
    if( data.length === 0 ) return 300;    
    return Math.floor( maximum_y * 1.1 );
  } );    
  let range_minimum = $derived.by( () => {
    if( data.length === 0 ) return 0;        
    return Math.floor( minimum_y * 0.90 );
  } );

   let area = $derived.by( () => {
    const padding_bottom = 24;    
    const padding_left = 40;    
    const canvas_height = graph_height - padding_bottom;

    if( !data || data.length === 0 ) return '';    

    let result = new String( plot );
    
    return result += ` L ${graph_width} ${canvas_height} L ${padding_left} ${canvas_height} Z`;
  } );  
  let points = $derived.by( () => {
    const padding_left = 40;
    const padding_bottom = 24;
    const canvas_width = graph_width - padding_left;
    const canvas_height = graph_height - padding_bottom;

    if( !data || data.length === 0 ) return [];

    const scaleX = t => padding_left + ( ( t - minimum_x ) / ( maximum_x - minimum_x || 1 ) ) * canvas_width;
    const scaleY = v => ( ( range_maximum - v ) / ( range_maximum - range_minimum ) ) * canvas_height;

    if( data.length === 1 ) {
      const y = scaleY( data[0].weight );

      return [
        [padding_left, scaleY( data[0].weight )],
        [graph_width, y]
      ];
    }

    return data.map( ( v ) => [
      scaleX( v.created.getTime() ),
      scaleY( v.weight )
    ] );
  } );
  let plot = $derived.by( () => {
    if( !data || data.length === 0 ) return '';    

    let d = `M ${points[0][0]} ${points[0][1]}`;
    for( let i = 1; i < points.length; i++ ) {
      d += ` L ${points[i][0]} ${points[i][1]}`;
    }

    return d;
  } );

  let week = $derived.by( () => {
    const now = new Date();
    now.setDate( now.getDate() - 7 );
    now.setHours( 0 );
    now.setMinutes( 0 );
    now.setSeconds( 0 );
    now.setMilliseconds( 0 );

    return value.filter( ( v ) => v.created.getTime() > now.getTime() ).sort( ( a, b ) => {
      if( a.created.getTime() > b.created.getTime() ) return 1;
      if( a.created.getTime() < b.created.getTime() ) return -1;      
      return 0;      
    } );
  } );
  let month = $derived.by( () => {
    const now = new Date();
    now.setDate( now.getDate() - 30 );
    now.setHours( 0 );
    now.setMinutes( 0 );
    now.setSeconds( 0 );
    now.setMilliseconds( 0 );

    return value.filter( ( v ) => v.created.getTime() > now.getTime() ).sort( ( a, b ) => {
      if( a.created.getTime() > b.created.getTime() ) return 1;
      if( a.created.getTime() < b.created.getTime() ) return -1;      
      return 0;      
    } );
  } );    
  let year = $derived.by( () => {
    const now = new Date();
    now.setFullYear( now.getFullYear() - 1 );
    now.setHours( 0 );
    now.setMinutes( 0 );
    now.setSeconds( 0 );
    now.setMilliseconds( 0 );

    return value.filter( ( v ) => v.created.getTime() > now.getTime() ).sort( ( a, b ) => {
      if( a.created.getTime() > b.created.getTime() ) return 1;
      if( a.created.getTime() < b.created.getTime() ) return -1;      
      return 0;      
    } );
  } );

  onMount( () => {
    const timeline = window.localStorage.getItem( 'fh_timeline' );
    view = timeline === null ? 3 : parseInt( timeline );
  } );

  function onViewClick( value ) {
    view = value;
    window.localStorage.setItem( 'fh_timeline', value );
  }

  function formatDate( value ) {
    const formatter = new Intl.DateTimeFormat( navigator.language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    } );
    return formatter.format( value );
  }
</script>

<figure>
  <div>
    <button 
      class:selected={view === 0} 
      onclick={() => onViewClick( 0 )} 
      type="button">
      Week
    </button>
    <button 
      class:selected={view === 1} 
      onclick={() => onViewClick( 1 )} 
      type="button">
      Month
    </button>    
    <button 
      class:selected={view === 2} 
      onclick={() => onViewClick( 2 )} 
      type="button">
      Year
    </button>    
    <button 
      class:selected={view === 3} 
      onclick={() => onViewClick( 3 )} 
      type="button">
      All
    </button>    
  </div>

  <svg bind:clientWidth={graph_width} bind:clientHeight={graph_height}>
    {#each {length: 6}, index}
      {@const ratio = index / 5}
      {@const a_value = range_maximum - ratio * ( range_maximum - range_minimum )}
      {@const y = ratio * ( graph_height - 24 )}
      {@const text = ( index === 0 || index === 5 ) ? null : Math.floor( a_value )}
      <text class="axis" y={y ? y : 0}>{text}</text>
      <path class="axis" class:last={index === 5} d={`M 40 ${y === 0 ? 1 : y} L ${graph_width} ${y === 0 ? 1 : y}`}></path>      
    {/each}
    {#if data.length === 0}
      <text class="label" x={40 + ( ( graph_width - 40 ) / 2 )} y={graph_height - 12}>{formatDate( new Date() )}</text>              
    {:else if data.length === 1}
      <text class="label" x={40 + ( ( graph_width - 40 ) / 2 )} y={graph_height - 12}>{formatDate( data[0].created )}</text>                  
    {:else}
      <text class="label first" x="40" y={graph_height - 12}>{formatDate( data[0].created )}</text>          
      <text class="label last" x={graph_width} y={graph_height - 12}>{formatDate( data[data.length - 1].created )}</text>                       
    {/if}
    <path class="area" d={area}></path>    
    <path class="plot" d={plot}></path>
  </svg>

</figure>

<style>  
  button {
    appearance: none;
    background: #00000010;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    color: #161616;
    cursor: pointer;
    font-family: 'Roboto Variable', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    outline: none;
    padding: 6px 0 6px 0;
    text-align: center;
    width: 60px;
  }

  button.selected {
    color: #0284c7;
  }

  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 8px;
    justify-content: center;
    padding: 0 0 16px 0;
  }

  figure {
    box-sizing: border-box;
    margin: 0;
    max-width: 660px;
    min-width: 330px;
    padding: 4px;
    width: 100%;
  }

  path.area {
    fill: #00000010;
  }

  path.axis {
    stroke: #00000040;
    stroke-dasharray: 3 4;
  }

  path.axis.last {
    stroke: #00000040;
    stroke-dasharray: unset;
  }
  
  path.plot {
    fill: none;
    stroke-linejoin: round;
    stroke: #161616;
    stroke-width: 3px;    
  }  

  svg {
    height: 181px;
    width: 100%;
  }

  text {
    fill: #161616;
    font-family: 'Roboto Variable';
    font-size: 14px;
    font-weight: 400;
  }

  text.axis {
    dominant-baseline: middle;
  }

  text.label {
    text-anchor: middle;
    dominant-baseline: middle;    
  }

  text.label.first {
    text-anchor: start;
    dominant-baseline: middle;    
  }  

  text.label.last {
    text-anchor: end;
    dominant-baseline: middle;    
  }    
</style>
