import { Console, Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import { InputValidator } from "./utils/InputValidator.js";
import Output from "./Output.js";
import Input from "./Input.js";
import Compare from "./Compare.js";

class App {
  #trialNum = 0;
  #totalLotto = [];
  #winningLotto = [];
  #bonus = 0;
  #compareResult = [];

  async play() {
    this.inputAmount();
  }

  async inputAmount() {
    Console.print("구입금액을 입력해 주세요.");
    const money = await Console.readLineAsync("");

    const input = new Input(money);

    this.#trialNum = input.inputMoney();

    this.RandomNums();
  }

  async inputWinning() {
    Console.print("당첨 번호를 입력해 주세요.");
    const input = await Console.readLineAsync("");

    const inputWinnNum = new Input(input);

    this.#winningLotto = inputWinnNum.inputWin();

    Console.print("보너스 번호를 입력해 주세요.");
    this.#bonus = await Console.readLineAsync("");

    const inputBonus = new Input(this.#bonus);
    this.#bonus = inputBonus.inputBonus();

    this.compare();
  }

  RandomNums() {
    for (let i = 0; i < this.#trialNum; i++) {
      let lotto = new Output();
      const newLotto = lotto.createLotto();
      Console.print(newLotto);
      this.#totalLotto.push(newLotto);
    }

    Console.print(this.#totalLotto);
    this.inputWinning();
  }

  compare() {
    Console.print(this.#winningLotto);
    Console.print(Number(this.#bonus));
    Console.print(this.#totalLotto);

    this.#totalLotto.forEach((lotto) => {
      const result = new Compare(
        lotto,
        this.#winningLotto,
        Number(this.#bonus)
      );
      result.compareLotto();
      const same = result.getResultObject();
      this.#compareResult.push(same);
    });
    Console.print(this.#compareResult);
  }
}

export default App;
