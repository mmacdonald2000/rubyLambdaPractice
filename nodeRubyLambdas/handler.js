// Node Lambda to call Ruby Lambda
export async function main(event, context, callback) {
  // to access event variables:
  // event.variable_name
  const eaiLicense = {
    host_id: 0x28f10e02de7b,
    id: 45,
    sn: 12345,
    type: "eAI",
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    regUsers: 999,
    conUsers: 999,
    conRuns: 10,
  };

  const emLicense = {
    id: 45,
    sn: 12345,
    host_id: '3a:00:a8:40:42:00',
    type: 'eM',
    start_date: new Date(),
    end_date: new Date(2022, 2, 5, 8),
    connections: 1,
  };

  

}
