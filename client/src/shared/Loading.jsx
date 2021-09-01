/**
 * Created by Hai Anh on 5/4/20
 */

import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import { css } from "@emotion/core";
import PuffLoader from "react-spinners/PuffLoader";

import Modal from "./Modal";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const withLoadingScreen = (WrapperComponent) => {
  class LoadingScreen extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        loading: false,
      };
      this.mounted = false;
      this.closeLoadingTimeout = null;
    }

    componentDidMount() {
      this.mounted = true;
    }

    componentWillUnmount() {
      this.mounted = false;
      if (this.closeLoadingTimeout) {
        clearTimeout(this.closeLoadingTimeout);
      }
    }

    showLoading = (ignoreTimeout = false) => {
      this.setState(
        {
          loading: true,
        },
        () => {
          if (ignoreTimeout) {
            return;
          }
          this.closeLoadingTimeout = setTimeout(() => {
            if (this.mounted) {
              this.setState({
                loading: false,
              });
            }
          }, 1000000);
        }
      );
    };

    hideLoading = (callback = null) => {
      if (callback !== null) {
        this.setState({
          loading: false,
        });
      } else {
        this.setState(
          {
            loading: false,
          },
          callback
        );
      }
    };

    renderLoading = () => {
      return (
        <PuffLoader
          css={override}
          size={400}
          color="#2C6CAF"
          loading={this.state.loading}
        />
      );
    };

    render() {
      const newProps = {
        showLoading: this.showLoading,
        hideLoading: this.hideLoading,
      };
      return (
        <div className="loading-hoc__container">
          <Modal
            show={this.state.loading}
            className={"loading-modal__container"}
            showClose={false}
          >
            {this.renderLoading()}
          </Modal>
          <WrapperComponent {...this.props} {...newProps} />
        </div>
      );
    }
  }

  hoistNonReactStatics(LoadingScreen, WrapperComponent);
  return LoadingScreen;
};

export default withLoadingScreen;
