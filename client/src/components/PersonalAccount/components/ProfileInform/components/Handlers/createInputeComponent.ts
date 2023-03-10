import { createInputElement } from 'src/components/ui/Input/Input';
import { createElem } from 'src/utils/create-element';

export const createInputComponent = (data: InputComponent, hasIcon?: boolean, svg?: string) => {
  const container = createElem('form', 'profile__form-cnt');
  const label = createElem('label', 'profile__form-label');
  label.innerHTML = data.label;
  const input = createInputElement(data.attribute);
  input.setAttribute('spellcheck', 'false');

  if (hasIcon) {
    const icon = createElem('div', 'icon__container');
    icon.innerHTML = svg as string;
    container.append(label, icon, input);

    return { container, input, icon, label };
  }

  container.append(label, input);
  return { container, input, label };
};
