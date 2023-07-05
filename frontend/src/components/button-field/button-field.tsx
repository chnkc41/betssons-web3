import { Component, Host, Prop, State, h } from '@stencil/core';
import { CONTROL_SIZES, SIZES } from '../../constants/constant';
import classNames from 'classnames';

@Component({
  tag: 'button-field',
  styleUrl: '../../tailwind.css',
  shadow: true,
})
export class ButtonField {
  @Prop({ mutable: true }) content: any;
  @Prop({ mutable: true }) type: string;
  @Prop({ mutable: true }) className: string;
  @Prop({ mutable: true }) block: string;
  @Prop({ mutable: true }) shape: string; 
  @Prop({ mutable: true }) icon: string;
  @Prop({ mutable: true }) btnSize: string;

  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) loading: boolean;
  @Prop({ mutable: true }) onClick: any;

  @State() defaultClass: string = 'btn';
  @State() sizeIconClass: string = 'inline-flex items-center justify-center';
  @State() classes: string = '';

  getButtonSize = () => {
    let sizeClass = '';
    switch (this.btnSize) {
      case SIZES.XL:
        sizeClass = classNames(`h-${CONTROL_SIZES.xl}`, this.icon && !this.content ? `w-${CONTROL_SIZES.xl} ${this.sizeIconClass} text-4xl` : 'px-8 py-2 text-xl');
        break;
      case SIZES.LG:
        sizeClass = classNames(`h-${CONTROL_SIZES.lg}`, this.icon && !this.content ? `w-${CONTROL_SIZES.lg} ${this.sizeIconClass} text-2xl` : 'px-8 py-2 text-lg');
        break;
      case SIZES.SM:
        sizeClass = classNames(`h-${CONTROL_SIZES.sm}`, this.icon && !this.content ? `w-${CONTROL_SIZES.sm} ${this.sizeIconClass} text-lg` : 'px-2.5 py-2 text-sm');
        break;
      case SIZES.XS:
        sizeClass = classNames(`h-${CONTROL_SIZES.xs}`, this.icon && !this.content ? `w-${CONTROL_SIZES.xs} ${this.sizeIconClass} text-base` : 'px-3 py-1 text-xs');
        break;
      default:
        sizeClass = classNames(`h-${CONTROL_SIZES.md}`, this.icon && !this.content ? `w-${CONTROL_SIZES.md} ${this.sizeIconClass} text-xl` : 'text-base px-8 py-2');
        break;
    }
    return sizeClass;
  };

  componentWillLoad() {
    this.classes = classNames(this.defaultClass, this.shape, this.getButtonSize(), this.className, this.block ? 'w-full' : '');
  }

  handleClick = e => {
    // const { onClick } = props
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }
    this.onClick?.(e);
  };

  renderChildren = () => {
    if (this.loading && this.content) {
      return <span class="flex items-center justify-center">{this.content}</span>;
    }

    if (this.icon && !this.content && this.loading) {
      return <p> Loading...</p>;
    }

    if (this.icon && !this.content && !this.loading) {
      return <span>{this.icon}</span>;
    }

    if (this.icon && this.content && !this.loading) {
      return (
        <span class="flex items-center justify-center">
          <span class="text-lg">{this.icon}</span>
          <span class="ltr:ml-1 rtl:mr-1">{this.content}</span>
        </span>
      );
    }

    return <span>{this.content}</span>;
  };

  render() {
    return (
      <button class={this.classes} onClick={this.handleClick}>
        {this.renderChildren()}
      </button>
    );
  }
}
