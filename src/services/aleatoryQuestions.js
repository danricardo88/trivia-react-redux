export default function aleatoryQuestions(listOfQuestions) {
  let currentIndex = listOfQuestions.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex -= 1;

    [listOfQuestions[currentIndex], listOfQuestions[randomIndex]] = [
      listOfQuestions[randomIndex], listOfQuestions[currentIndex]];
  }

  return listOfQuestions;
}

// Referência da lógica do embaralhamento dos itens do array:
// http://cangaceirojavascript.com.br/como-embaralhar-arrays-algoritmo-fisher-yates/
