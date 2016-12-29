/**
 * Created by guopeng on 2016/12/29.
 */
import React from 'react';
import expect from 'expect'
import { mount, shallow } from 'enzyme';
import context from '../context';
import {getInstance} from '../util'
import Home from '../../src/components/pages/Home/Page';
import Button from 'chanjet-ui/lib/Button';

describe('这是一个home页的demo', ()=>{

  it('进入列表页的按钮名称应该是 `下一页`', ()=>{
    const wrapper = mount(<Home/>, context);
    //const instance = getInstance(wrapper); // 获取Component 实例
    expect(wrapper.find(Button).at(0).prop('label')).toBe('下一页');
  })

})
