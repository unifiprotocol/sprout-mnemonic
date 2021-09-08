import React from "react";
import { Row, Col, Divider } from "antd";

export const Footer = () => {
  return (
    <Row justify="end" align="middle" className="footer">
      <Col>
        <a href="https://unifiprotocol.com" target="_blank" rel="noreferrer">
          Unifi Protocol
        </a>{" "}
        <Divider type={"vertical"} />{" "}
        <a
          href="https://github.com/unifiprotocol/sprout-mnemonic"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>{" "}
        <a href="https://t.me/unifiprotocol" target="_blank" rel="noreferrer">
          Telegram
        </a>
      </Col>
    </Row>
  );
};
