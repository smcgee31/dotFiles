const gameState = {
  ranking: [4, 2, 3, 1],
  teams: {
    1: {
      completedRounds: 3,
      missed: 1,
      score: 2,
    },
    2: {
      completedRounds: 3,
      missed: 2,
      score: 1,
    },
    3: {
      completedRounds: 3,
      missed: 2,
      score: 1,
    },
    4: {
      completedRounds: 3,
      missed: 2,
      score: 1,
    },
  },
};

const positions = {
  0: '1st',
  1: '2nd',
  2: '3rd',
  3: '4th',
};

const RankRow = (props) => {
  return (
    <>
      <View>
        <Text>{place}</Text>
        <Text>Team {teamNameOrNumber}</Text>
        <Text>
          {score}/{attempts}
        </Text>
      </View>
    </>
  );
};

const Ranking = (props) => {
  const { gameState } = props;

  return (
    <>
      <View>
        {gameState.rank.map((r, i) => {
          const place = positions[i];
          const msg = i === 0 ? `Being in ${place} place is so cool!` : '';
          return (
            <>
              <RankRow
                place={place}
                teamNameOrNumber={r}
                successes={gameState.teams[r].score}
                tries={gameState.teams[r].score + gameState.teams[r].missed}
                msg={msg}
              />
            </>
          );
        })}
      </View>
    </>
  );
};
