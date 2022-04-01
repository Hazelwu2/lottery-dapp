import { useConnect } from 'wagmi'

export const ConnectWallet = () => {
  const [{ data, error }, connect] = useConnect()

  return (
    <>
      {data.connectors.map((connector) => (
        <div className="col-sm-12" key={connector.id + Math.random()}>
          <div className="m-auto mb-2">
            <button
              className="btn btn-primary"
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect(connector)}
            >
              連接錢包
              {!connector.ready && ' (unsupported)'}
            </button>
          </div>
        </div>
      ))}
      <div className="col-sm-12">
        {error && <div>{error?.message ?? 'Failed to connect'}</div>}
      </div>
    </>
  )
}