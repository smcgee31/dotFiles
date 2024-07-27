// let responseDataFromQuery = [];

// const getTopicImageName = async () => {
//   const getTopicIdImageName = `query getTopicIdImageName {
//     topic(order_by: {id: asc}) {
//       id
//       image_name
//     }
//   }`;
//   const response = await fetch('https://kind-ghost-36.hasura.app/v1/graphql', {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json',
//       'x-hasura-admin-secret': 'qLVUoVVJtbNjg6zF3vHRPCVD6b5s51P1ycwKYmGRPio9yV3WC6pd6aE7rb0t0fCe',
//       'X-REQUEST-TYPE': 'GraphQL',
//     },
//     body: JSON.stringify({
//       query: getTopicIdImageName,
//     }),
//   });
//   responseDataFromQuery = await response.json();
//   console.log(JSON.stringify(responseDataFromQuery.data.topic, null, 2));
// };

// getTopicImageName();

// const topicImageName = async (array) => {
//   for (let i = 0; (i = 0); i++) {
//     const updateTopicImageName = `mutation updateTopicImageName {update_topic(where: {id: {_eq: ${
//       array[i].id
//     }}}, _set: {image_name: ${array[i].image_name + '.png'}}) {
//       affected_rows
//     }}`;
//     const response = await fetch(
//       'https://kind-ghost-36.hasura.app/v1/graphql',

//       {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-hasura-admin-secret':
//             'qLVUoVVJtbNjg6zF3vHRPCVD6b5s51P1ycwKYmGRPio9yV3WC6pd6aE7rb0t0fCe',
//           'X-REQUEST-TYPE': 'GraphQL',
//         },
//         body: JSON.stringify({
//           query: updateTopicImageName,
//         }),
//       }
//     );
//     const responseDataFromInsert = await response.json();
//     console.log(JSON.stringify(responseDataFromInsert));
//   }
// };

// const graphqlHandler = () => {
//   getTopicImageName();
//   topicImageName(responseDataFromQuery);
// };

// ----------------------------

// const gameState = {
//   rank: [],
//   currentTeamsTurn: 1,
//   numOfTeams: 2,
//   rounds: 3,
//   currentRound: 1,
//   roundTime: 10000,
//   age: 'kids',
//   year: {
//     min: 0,
//     max: 0,
//   },
//   photo: false,
//   categories: ['animals', 'tools'],
//   teams: {
//     1: {
//       completedRounds: 0,
//       score: 0,
//       missed: 0,
//       roundScores: [],
//     },

//     2: {
//       completedRounds: 0,
//       score: 0,
//       missed: 0,
//       roundScores: [],
//     },
//   },
// };

// const buildQuery = () => {
//   let topicQueries = 'query MyQuery {';
//   for (let i = 0; i < gameState.categories.length; ++i) {
//     let topicQuery = `
//       topic${i + 1}: topic(where: {
//         topic_id__topic_age_types: {age_type: {_eq: ${gameState.age}}},
//         topic_id__topic_category_types: {category_type: {_eq: ${gameState.categories[i]}}}
//       } limit: 5)
//       {
//         description
//         image_name
//       }
//     `;
//     topicQueries += topicQuery;
//     // console.log(':::::', topicQueries);
//   }

//   return topicQueries + '}';
// };

// console.log(buildQuery());

// ===================================

// const responseData = {
//   data: {
//     topic1: [
//       {
//         description: 'peacock',
//         image_name: 'peacock.png',
//       },
//       {
//         description: 'otter',
//         image_name: 'otter.png',
//       },
//       {
//         description: 'walrus',
//         image_name: 'walrus.png',
//       },
//       {
//         description: 'lion',
//         image_name: 'lion.png',
//       },
//       {
//         description: 'elephant',
//         image_name: 'elephant.png',
//       },
//     ],

//     topic2: [
//       {
//         description: 'cheeseburger',
//         image_name: 'cheeseburger.png',
//       },
//       {
//         description: 'banana',
//         image_name: 'banana.png',
//       },
//       {
//         description: 'spaghetti',
//         image_name: 'spaghetti.png',
//       },
//       {
//         description: 'vegetables',
//         image_name: 'vegetables.png',
//       },
//       {
//         description: 'cake',
//         image_name: 'cake.png',
//       },
//     ],
//   },
// };
// let array = [];
// for (const key in responseData.data) {
//   array.push(...responseData.data[key]);
// }

// console.log(array);

// ===================================

const gameState = {
  rank: [],
  currentTeamsTurn: 1,
  numOfTeams: 2,
  rounds: 3,
  currentRound: 1,
  roundTime: 10000,
  age: 'kids',
  year: {
    min: 0,
    max: 0,
  },
  photo: false,
  categories: ['animals', 'tools'],
  teams: {
    1: {
      completedRounds: 0,
      score: 0,
      missed: 0,
      roundScores: [],
    },

    2: {
      completedRounds: 0,
      score: 0,
      missed: 0,
      roundScores: [],
    },
  },
};

const buildGetTopicsQuery = (gameState) => {
  const gameStateAgeType = gameState.age.toLowerCase();
  let topicQueries = `query getTopics {`;
  for (let i = 0; i < gameState.categories.length; ++i) {
    let gameStateCategoryType = gameState.categories[i].replace(/ /g, '_').toLowerCase();
    console.log(gameStateCategoryType);
    let topicQuery = `topic${
      i + 1
    }: get_random_topics(where: {topic_id__topic_age_types: {age_type: {_eq: ${gameStateAgeType}}}, topic_id__topic_category_types: {category_type: {_eq: ${gameStateCategoryType}}}}, limit: 5) {
        description
        image_name
    }`;
    topicQueries += topicQuery;
  }
  topicQueries += '}';

  return topicQueries;
};

const buildGetTopicsQuery2 = (gameState) => {
  const gameStateAgeType = gameState.age.toLowerCase();

  const finalQuery = gameState.categories.reduce((topicQueries, category, i) => {
    let gameStateCategoryType = category.replace(/ /g, '_').toLowerCase();
    topicQueries += `topic${
      i + 1
    }: get_random_topics(where: {topic_id__topic_age_types: {age_type: {_eq: ${gameStateAgeType}}}, topic_id__topic_category_types: {category_type: {_eq: ${gameStateCategoryType}}}}, limit: 5) {
        description
        image_name
    }`;
    return topicQueries;
  }, 'query getTopics {');

  return finalQuery + '}';
};

// console.log(buildGetTopicsQuery(gameState));

console.log(buildGetTopicsQuery2(gameState));
