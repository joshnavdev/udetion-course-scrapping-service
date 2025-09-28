export interface KafkaConfig {
  brokers: string[];
}

export default (): { kafka: KafkaConfig } => ({
  kafka: {
    brokers: [process.env.KAFKA_BROKER_0!],
  },
});
