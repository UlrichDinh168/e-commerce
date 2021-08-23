/**
 * Error boundary component
 * Catch JavaScript errors anywhere in their child component tree
 *
 * @author Tu Le <anh.le@vertics.co>
 *
 */
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import * as Sentry from "@sentry/react";

// component
import Button from "shared/components/Button";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  onBack = () => {
    this.props.history.push("/dashboard");
  };
  render() {
    const { t } = this.props;
    const { error } = this.state;
    if (error) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <Button text="Back" onClick={this.onBack} />
        </div>
      );
    }

    return this.props.children;
  }
}

export default withRouter(connect()(withTranslation()(ErrorBoundary)));
