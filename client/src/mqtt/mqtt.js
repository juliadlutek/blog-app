import mqtt from 'mqtt/dist/mqtt';
export var client;
export var isSubed;
export var payload;
export var connectStatus;
export const mqttConnect = (host) => {
    connectStatus = 'Connecting'
    client = mqtt.connect(host)
    console.log("MQTT connected");
  };

  export const mqttDisconnect = () => {
    if (client) {
      client.end(() => {
        connectStatus = 'Connect'
      });
      console.log("MQTT disconnected");
    }
  }
 
  export const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error: ', error);
        } else {
          console.log("MQTT message published");
        }
      });
    }
  }

  export const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        } else {
          console.log("MQTT topic subscribed");
        }
        isSubed = true
      });
    }
  };

  export const mqttUnSub = (subscription) => {
    if (client) {
      const { topic } = subscription;
      client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        } else {
          console.log("MQTT topic unsubscribed");
        }
        isSubed = false
      });
    }
  };
