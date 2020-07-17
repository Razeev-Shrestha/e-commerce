import React from 'react';

import { DirectoryContainer} from './directory.style';

import MenuItem from '../menu-item/menu-item.component';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {selectDirectorySections} from '../../redux/directory/directory.selector';

const Directory=({sections})=>(
    <DirectoryContainer>
                {sections.map(({  id, ...otherSectionProps }) => (
                    <MenuItem key={id} {...otherSectionProps} />
            ))}
    </DirectoryContainer>
)

const mapStateToProps = createStructuredSelector({
    sections:selectDirectorySections
});

export default connect(mapStateToProps)(Directory);