import React, { Fragment } from 'react';
import { Icon } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ConstantList from '../../app/appConfig';

const Breadcrumb = ({ routeSegments }) => {
    return (
        <div className="flex flex-middle position-relative">
            <NavLink to={ConstantList.ROOT_PATH}>
                <Icon className="text-middle ml-8 mb-1" color="primary">
                    home
                </Icon>
            </NavLink>
            {routeSegments
                ? routeSegments.map((route) => (
                      <Fragment key={route.name}>
                          <Icon className="text-hint">navigate_next</Icon>
                          {route.path ? (
                              <NavLink to={ConstantList.ROOT_PATH + route.path}>
                                  <span className="capitalize text-muted">{route.name}</span>
                              </NavLink>
                          ) : (
                              <span className="capitalize text-muted">{route.name}</span>
                          )}
                      </Fragment>
                  ))
                : null}
        </div>
    );
};

export default Breadcrumb;
