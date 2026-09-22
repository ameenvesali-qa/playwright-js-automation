const { test, expect } = require('@playwright/test');

test('GET /booking returns a list of bookings', async ({ request }) => {
  const response = await request.get('https://restful-booker.herokuapp.com/booking');
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});

test('POST /booking creates a booking', async ({ request }) => {
  const response = await request.post('https://restful-booker.herokuapp.com/booking', {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: {
      firstname: 'Ameen',
      lastname: 'Test',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2026-10-01', checkout: '2026-10-05' },
      additionalneeds: 'Breakfast',
    },
  });

  const body = await response.json();

  expect(body.bookingid).toBeDefined();
  expect(body.booking.firstname).toBe('Ameen');
  expect(body.booking.lastname).toBe('Test');
  expect(body.booking.totalprice).toBe(100);
  expect(body.booking.bookingdates.checkin).toBe('2026-10-01');

  const id = body.bookingid;
  const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${id}`);
  expect(getResponse.status()).toBe(200);
  const fetched = await getResponse.json();
  expect(fetched.firstname).toBe('Ameen');
  expect(response.status()).toBe(200);
});
