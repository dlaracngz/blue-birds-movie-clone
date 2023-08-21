import Skeleton from "react-loading-skeleton";

function CardSkeleton({ cards }) {
  return Array(cards).map((item) => {
    <div className="card-skeleton" key={item.id}>
      <div className="top">
        <Skeleton width={50} height={50}></Skeleton>
      </div>
      <div className="bottom">
        <Skeleton count={4} style={{ marginBottom: ".6rem" }} />
      </div>
    </div>;
  });
}

export default CardSkeleton;
