import { shallow } from 'enzyme';
import ImageWrapper from 'components/ImageWrapper';
import React from 'react';
import { testComponentType } from '@types';

const setUp = (props: any) => shallow(<ImageWrapper {...props} />);

let component: testComponentType;

describe('Test for ImageWrapper', () => {
  beforeEach(() => {
    component = setUp({ source: 'Logo' });
  });

  it('Render ImageWrapper component', () => {
    expect(component).toMatchSnapshot();
  });
});
