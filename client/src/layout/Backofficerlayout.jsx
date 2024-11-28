import React from 'react';

const BackofficerLayout = (props) => {
    return (
        <div>
            <div className={props.class}>
                {props.children}
            </div>
        </div>
    );
};

export default BackofficerLayout;
