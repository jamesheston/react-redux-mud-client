import {Trigger} from '../mudClientMiddleware/managers/TriggerManager'
import {Alias}   from '../mudClientMiddleware/managers/AliasManager'

export const userConfig = {
  aliases: [
    // some map switching shortcuts
    new Alias('oon', 'open exit north'  ), 
    new Alias('ooe', 'open exit east'  ), 
    new Alias('oos', 'open exit south' ), 
    new Alias('oow', 'open exit west'  ), 
    new Alias('oou', 'open exit up'  ), 
    new Alias('ood', 'open exit down'  ), 
    new Alias('boots', ['get boots backpack', 'remove boots', 'wear 2.boots', 'put boots backpack'])
  ], 
  triggers: [

    // Login Triggers
    // new Trigger('By what name do you wish to be known?', ''),
    // new Trigger('Account pass phrase', ''),

    // leave 3 lines below on to keep xml mode on for movement tracking, etc
    new Trigger('Reconnecting', 'change xml'),
    new Trigger('XML mode is now off.', 'change xml'),
    new Trigger('Welcome to the land of Middle-earth.', 'change xml'),

    new Trigger('*** Re', ' '), // automatically skip through page continue prompts

    // Autoshoot & Recover Triggers
    // new Trigger ('dodges your attempt to shoot', 'shoot'),
    // new Trigger ('You strongly shoot', 'shoot'),
    // new Trigger ('You shoot', 'shoot'),
    // new Trigger ('Your attempt to shoot', 'shoot'),
    // new Trigger ('You try to shoot', 'shoot'),
    // new Trigger ('Aye! You cannot concentrate any more', 'shoot'),
    // new Trigger ('Argh! You cannot concentrate any more...', 'shoot'),
    // new Trigger ('SNAP! Your string breaks! You bend a new one...', 'shoot'),
    // new Trigger ('You lightly shoot', 'shoot'),
    // new Trigger ('You barely shoot', 'shoot'),
    // new Trigger(' R.I.P.', 'recover'),

    // new Trigger('You failed to escape', 'escape'),

    // Warrior Triggers
    // new Trigger ('seems to have recovered', 'b'), // autobash
  ]
}