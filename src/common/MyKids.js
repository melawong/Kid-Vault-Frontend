import MomApi from "../helpers/momApi";

function MyKids() {

  // async function getMyKids() {
  //   const myKids = await MomApi.getMyKids();
  //   console.log("MY KIDS", myKids);
  //   return (
  //     myKids.map(kid => <li> {kid.first_name} {kid.last_name} </li>)
  //   );

  // }

  const myKids = fetch(process.env.REACT_APP_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_API_KEY,
    },
    body: JSON.stringify({ query: '{myQuery {first_name last_name}}' }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    });


  return (<div>
    <ul>

    </ul>
  </div>);

}

export default MyKids;