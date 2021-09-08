import React, { useCallback, useState } from "react";
import { Row, Col, Button, Alert, message, Input } from "antd";
import { deriveAccounts } from "../Crypto/Mnemonic";

const { TextArea } = Input;

const InformationMessage = () => {
  return (
    <>
      <div>
        If you wish, for your security, you can run this tool disconnected from
        the internet.
      </div>
    </>
  );
};

export const Body = () => {
  const [mnemonic, setMnemonic] = useState("");
  const [deserialized, setDeserialized] = useState("");

  const onDeserialize = useCallback(() => {
    try {
      const result = deriveAccounts(mnemonic);
      console.log(result);
      const formattedResult = Object.keys(result)
        .reduce((t: string[], curr) => {
          t.push(`--- ${curr.toUpperCase()}`);
          const addressDetail = result[curr];
          t.push(`Address: ${addressDetail.address}`);
          t.push(`Private Key: ${addressDetail.privateKey}`);
          t.push("");
          return t;
        }, [])
        .join("\n");
      message.success("Successful deserialization!");
      setDeserialized(formattedResult);
    } catch (err) {
      console.error(err);
      message.error("Something went wrong");
    }
  }, [mnemonic]);

  const onClear = () => {
    setMnemonic("");
    setDeserialized("");
  };

  return (
    <div className="body">
      <Row justify="space-around" align="middle">
        <Alert message={<InformationMessage />} type="info" showIcon />
      </Row>
      <Row justify="space-around" align="middle">
        <Col span={10}>
          <h3>Type below your mnemonic:</h3>
          <TextArea
            rows={10}
            value={mnemonic}
            onChange={(evt) => setMnemonic(evt.target.value)}
          />
        </Col>
        <Col span={10}>
          <h3>Your private keys:</h3>
          <TextArea rows={10} value={deserialized} />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col span={3}>
          <Button type="primary" size={"large"} onClick={onDeserialize}>
            Deserialize
          </Button>
        </Col>
        <Col span={3}>
          <Button type="primary" size={"large"} onClick={onClear}>
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};
