import React, { useState, useEffect, useRef } from 'react';
import GanttJS from '@/components/FrappeGantt/src';

function noop() { }

function ReactGantt(props) {
  const {
    viewMode,
    tasks,
    onClick,
    onDateChange,
    onProgressChange,
    onViewChange,
    customPopupHtml, } = props
  const ganttRef = useRef(null);
  const [ganttInst, setGannt] = useState(null);

  function renderFrappeGanttDOM() {
    // new instance
    //   const defaultOptions = {
    //     header_height: 50,
    //     column_width: 30,
    //     step: 24,
    //     view_modes: [...Object.values(VIEW_MODE)],
    //     bar_height: 20,
    //     bar_corner_radius: 3,
    //     arrow_curve: 5,
    //     padding: 18,
    //     view_mode: 'Day',
    //     date_format: 'YYYY-MM-DD',
    //     popup_trigger: 'click',
    //     custom_popup_html: null,
    //     language: 'en'
    // };
    const defaultOptions = {
      header_height: 50,
      column_width: 30,
      step: 24,
      bar_height: 10,
      padding: 40,
      bar_corner_radius:0,
      readOnly:true,
      popup_trigger: 'click',
      language: 'zh',
    };
    const gantt = new GanttJS(ganttRef.current, tasks, {
      on_click: onClick || noop,
      on_date_change: onDateChange || noop,
      on_progress_change: onProgressChange || noop,
      on_view_change: onViewChange || noop,
      showDetail:onClick||noop,
      custom_popup_html: customPopupHtml || null,
      ...defaultOptions
    });
    // when resize
    // bind(ganttRef, () => {
    //   if (gantt) {
    //     gantt.refresh(props.tasks);
    //   }
    // });
    // change view mode
    gantt.change_view_mode(viewMode);
    setGannt(gantt)
    // return ganttInst;
  };

  useEffect(() => {
    renderFrappeGanttDOM();
  }, []);

  useEffect(() => {
    if (ganttInst) {
      ganttInst.change_view_mode(props.viewMode);
      ganttInst.refresh(props.tasks);
    }
  }, [viewMode, ganttInst, tasks]);

  return (
    <div ref={ganttRef} />
  );

};

export default ReactGantt