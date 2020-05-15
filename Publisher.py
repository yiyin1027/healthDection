from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import uuid
import time
import threading
import thread
pnconfig = PNConfiguration()
from threading import Thread
pnconfig.subscribe_key = 'sub-c-2c446f30-32cd-11e9-aca0-3eee1dbf820c'
pnconfig.publish_key = 'pub-c-a49f577d-81c8-43c9-922e-3b13d0bbc91d'

pubnub = PubNub(pnconfig)

payload ={}
import datetime

class Worker(Thread):
    def run(self):
        for x in range(0, 86400):
            payload={}
            payload['timestamp']=datetime.datetime.fromtimestamp(time.time()).strftime('%H:%M:%S')
            payload['deviceID']="device"
            print ''
            print str(payload['timestamp'])  +"   "+ str(payload['deviceID'])
            print ''
            time.sleep(1)
            pubnub.publish().channel("cloud").message(payload).sync()

class Worker1(Thread):
    def run(self):
        for x in range(0, 10):
            payload={}
            payload['timestamp']=time.time()
            payload['deviceID']="dev2"
            print ''

            print str(payload['timestamp'])  +"   "+ str(payload['deviceID'])
            print ''
            time.sleep(1)
            pubnub.publish().channel("cloud").message(payload).sync()
class Worker2(Thread):
    def run(self):
        for x in range(0, 100):
            payload={}
            payload['timestamp']=time.time()
            payload['deviceID']="dev3"
            print ''

            print str(payload['timestamp'])  +"   "+ str(payload['deviceID'])
            print ''
            time.sleep(1)
            pubnub.publish().channel("cloud").message(payload).sync()
class Worker3(Thread):
      def run(self):
        for x in range(0, 100):
            payload={}
            payload['timestamp']=time.time()
            payload['deviceID']="dev4"
            print ''

            print str(payload['timestamp'])  +"   "+ str(payload['deviceID'])
            print ''
            time.sleep(1)
            pubnub.publish().channel("cloud").message(payload).sync()
class Worker4(Thread):
    def run(self):
        for x in range(0, 100):
            payload={}
            payload['timestamp']=str(time.time())
            payload['deviceID']="dev5"
            print ''
            print str(payload['timestamp'])  +"   "+ str(payload['deviceID'])
            print ''
            time.sleep(1)
            pubnub.publish().channel("cloud").message(payload).sync()

Worker().start()
#Worker1().start()
# Worker2().start()
# Worker3().start()
# Worker4().start()
