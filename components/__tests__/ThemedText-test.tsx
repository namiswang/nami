import * as React from 'react';
import renderer from 'react-test-renderer';

import { JText } from '../ui/JText';

it(`renders correctly`, () => {
  const tree = renderer.create(<JText>Snapshot test!</JText>).toJSON();

  expect(tree).toMatchSnapshot();
});
