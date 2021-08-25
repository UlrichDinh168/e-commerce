import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import Modal from "shared/components/Modal";
import LoadingIndicator from "shared/LoadingIndicator";

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
          }, 10000);
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

    render() {
      const newProps = {
        showLoading: this.showLoading,
        hideLoading: this.hideLoading,
      };
      return (
        <>
          <Modal
            show={this.state.loading}
            modalContainerClassName={"loading-modal__container"}
            showClose={false}
            showHeader={false}
            className="loading"
          >
            <LoadingIndicator />
          </Modal>
          <WrapperComponent {...this.props} {...newProps} />
        </>
      );
    }
  }

  hoistNonReactStatics(LoadingScreen, WrapperComponent);
  return LoadingScreen;
};

export default withLoadingScreen;
