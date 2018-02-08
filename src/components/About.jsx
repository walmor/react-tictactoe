import React from 'react';
import Subtitle from './Subtitle';

export default function About() {
  return (
    <div className="About">
      <Subtitle>About</Subtitle>
      <p>
        This is a simple game that was built to learn React and some other concepts and best
        practices used to develop modern web applications. Its source code is available on{' '}
        <a href="https://github.com/walmor/react-tictactoe" alt="react-tic-tac-toe">
          GitHub
        </a>{' '}
        under the MIT license.
      </p>
    </div>
  );
}
