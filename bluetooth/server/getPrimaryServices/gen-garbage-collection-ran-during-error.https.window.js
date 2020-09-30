// META: script=/resources/testdriver.js
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// Generated by //third_party/WebKit/LayoutTests/bluetooth/generate.py
'use strict';
const test_desc = 'Garbage Collection ran during a getPrimaryServices ' +
    'call that failed. Should not crash.'
const expected = new DOMException(
    'GATT Server is disconnected. Cannot retrieve services. (Re)connect first ' +
        'with `device.gatt.connect`.',
    'NetworkError');
let promise;

bluetooth_test(
    () => getEmptyHealthThermometerDevice()
              .then(({device}) => {
                promise = assert_promise_rejects_with_message(
                    device.gatt.getPrimaryServices(), expected);
                // Disconnect called to clear attributeInstanceMap and allow the
                // object to get garbage collected.
                device.gatt.disconnect();
                return runGarbageCollection();
              })
              .then(() => promise),
    test_desc);
