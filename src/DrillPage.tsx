import { Button } from "reactstrap";

function DrillPage({ onStop }: { onStop: () => void }) {
  return (
    <div>
      <span>5:00</span>
      <div>image</div>
      <div>
        <Button>prev</Button>
        <Button>1/4</Button>
        <Button>next</Button>
      </div>
      <Button onClick={() => onStop()}>back</Button>
    </div>
  );
}

export default DrillPage;
