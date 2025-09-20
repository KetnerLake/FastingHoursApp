import Dexie from "dexie";
import dexieCloud from "dexie-cloud-addon";

export class Database {
  constructor() {
    this._db = new Dexie( 'FastingHours', {addons: [dexieCloud]} );
    this._db.version( 30 ).stores( {
      history: 'id, started',
      hunger: 'id, created',
      water: 'id, created',
      weight: 'id, created'
    } );    
    this._db.cloud.configure( {
      customLoginGui: true,      
      databaseUrl: 'https://zzcxr8dte.dexie.cloud',
      requireAuth: false
    } );
  }

  check( email ) {
    return fetch( 'https://ketnerlake.com/api/dexie/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {server: 'zzcxr8dte', email} )
    } );    
  }

  login( otp ) {
    this._db.cloud.userInteraction.onSubmit( {otp} );
  }

  logout() {
    return this._db.cloud.logout();
  }  

  sync() {
    return this._db.cloud.sync( {purpose: 'pull', wait: true} );
  }  

  ui() {
    return this._db.cloud.userInteraction;
  }

  user() {
    return this._db.cloud.currentUser;
  }

  verify( email ) {
    return this._db.cloud.login( {email, grant_type: 'otp'} );
  }  

  browseHistory() {
    return this._db.history.toArray();
  }

  browseHistoryByEnd() {
    return this._db.history.toArray().then( ( data ) => {
      const empties = data.filter( ( value ) => value.ended === null ? true : false );
      return empties[0];
    } );
  }

  bulkHistory( items ) {
    return this._db.history.bulkAdd( items );
  }

  readHistory( id ) {
    return this._db.history.get( {id} );
  }

  editHistory( item ) {
    const clone = $state.snapshot( item );
    clone.updated = new Date();
    return this._db.history.put( clone ).then( () => this._db.history.get( {id: item.id} ) );
  }  

  addHistory() {
    const item = {
      id: crypto.randomUUID(),
      type: 'history',
      created: new Date(),
      updated: new Date(),
      started: new Date(),
      ended: null,
      notes: null
    };
    return this._db.history.add( item ).then( () => this._db.history.get( {id: item.id} ) );
  }

  deleteHistory( id ) {
    return this._db.history.delete( id );
  }

  browseHunger( recent = false ) {
    return this._db.hunger.toArray().then( ( data ) => {
      if( recent ) {
        data.sort( ( a, b ) => {
          if( a.created.getTime() < b.created.getTime() ) return 1;
          if( a.created.getTime() > b.created.getTime() ) return -1;
          return 0;          
        } );

        return data.length === 0 ? null : data[0];
      }
      
      return data;
    } );
  }

  bulkHunger( items ) {
    return this._db.hunger.bulkAdd( items );
  }  

  readHunger( id ) {
    return this._db.hunger.get( {id} );
  }

  editHunger( item ) {
    const clone = $state.snapshot( item );    
    clone.updated = new Date();
    return this._db.hunger.put( clone ).then( () => this._db.hunger.get( {id: item.id} ) );
  }  

  addHunger( level = 5 ) {
    const item = {
      id: crypto.randomUUID(),
      type: 'hunger',
      created: new Date(),
      updated: new Date(),
      level
    };
    return this._db.hunger.add( item ).then( () => this._db.hunger.get( {id: item.id} ) );
  }  

  deleteHunger( id ) {
    return this._db.hunger.delete( id );
  }    

  browseWater( filter = false ) {
    return this._db.water.toArray().then( ( data ) => {    
      if( filter ) {
        const start = new Date();
        start.setHours( 0 );
        start.setMinutes( 0 );
        start.setSeconds( 0 );
        start.setMilliseconds( 0 );

        const end = new Date( start.getTime() );
        end.setDate( end.getDate() + 1 );

        return data.filter( ( value ) => value.created.getTime() > start.getTime() && value.created.getTime() < end.getTime() ? true : false );
      } else {
        return data;
      }
    } );
  }

  bulkWater( items ) {
    return this._db.water.bulkAdd( items );
  }  

  readWater( id ) {
    return this._db.water.get( {id} );
  }  

  editWater( item ) {
    const clone = $state.snapshot( item );    
    clone.updated = new Date();
    return this._db.water.put( clone ).then( () => this._db.water.get( {id: item.id} ) );
  }
  
  addWater( volume ) {
    const item = {
      id: crypto.randomUUID(),
      type: 'water',
      created: new Date(),
      updated: new Date(),
      volume
    };
    const id = crypto.randomUUID();
    return this._db.water.add( item ).then( () => this._db.water.get( {id: item.id} ) );      
  }  

  deleteWater( id ) {
    return this._db.water.delete( id );
  }
  
  browseWeight( filter = false ) {
    return this._db.weight.toArray().then( ( data ) => {    
      if( filter ) {
        const start = new Date();
        start.setHours( 0 );
        start.setMinutes( 0 );
        start.setSeconds( 0 );
        start.setMilliseconds( 0 );

        const end = new Date( start.getTime() );
        end.setDate( end.getDate() + 1 );

        return data.filter( ( value ) => value.created.getTime() > start.getTime() && value.created.getTime() < end.getTime() ? true : false );
      } else {
        return data;
      }
    } );
  }

  bulkWeight( items ) {
    return this._db.weight.bulkAdd( items );
  }  

  readWeight( id ) {
    return this._db.weight.get( {id} );
  }  

  editWeight( item ) {
    const clone = $state.snapshot( item );    
    return this._db.weight.put( clone ).then( () => this._db.weight.get( {id: item.id} ) );
  }
  
  addWeight( item ) {
    const id = crypto.randomUUID();    
    const clone = $state.snapshot( item );    
    clone.id = id;

    console.log( 'ADD' );
    console.log( clone );

    return this._db.weight.add( clone ).then( () => this._db.weight.get( {id} ) );      
  }  

  deleteWeight( id ) {
    return this._db.weight.delete( id );
  }  
}
